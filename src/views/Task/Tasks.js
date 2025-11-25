import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CRow,
  CCol,
  CBadge,
  CFormCheck,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CAlert,
  CSpinner,
} from "@coreui/react";
import { supabase } from "../../lib/supabase";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const loadTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("deadline", { ascending: true });

    if (!error) setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) {
      showAlert("danger", "Judul harus diisi!");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        description,
        deadline,
        is_done: false,
      },
    ]);

    if (!error) {
      showAlert("success", "Tugas berhasil ditambahkan!");
      setTitle("");
      setDescription("");
      setDeadline("");
      loadTasks();
    }
  };

  const toggleDone = async (id, value) => {
    await supabase.from("tasks").update({ is_done: value }).eq("id", id);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    showAlert("success", "Tugas berhasil dihapus!");
    loadTasks();
  };

  const openEdit = (task) => {
    setEditData(task);
    setEditModal(true);
  };

  const saveEdit = async () => {
    const { id, title, description, deadline } = editData;
    await supabase
      .from("tasks")
      .update({ title, description, deadline })
      .eq("id", id);

    showAlert("success", "Tugas berhasil diperbarui!");
    setEditModal(false);
    loadTasks();
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false }), 3000);
  };

  const filteredTasks =
  filter === "overdue"
    ? tasks
        .filter(
          (t) => t.deadline && new Date(t.deadline) < new Date() && !t.is_done
        )
        .sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        )
    : tasks.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );


  return (
    <div className="px-3 py-3">
      {alert.show && (
        <CAlert color={alert.type} className="mb-3">
          {alert.message}
        </CAlert>
      )}

      <CCard className="mb-4 shadow-sm">
        <CCardBody>
          <h4 className="mb-3 fw-bold">Buat Tugas Baru</h4>

          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Judul</CFormLabel>
              <CFormInput
                placeholder="Contoh: Belajar React"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Deskripsi</CFormLabel>
              <CFormTextarea
                rows={3}
                placeholder="Opsional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol lg={6}>
              <CFormLabel>Deadline</CFormLabel>
              <CFormInput
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </CCol>
          </CRow>

          <CButton color="success" onClick={addTask}>
            Tambahkan
          </CButton>
        </CCardBody>
      </CCard>

      <div className="d-flex gap-2 mb-3">
        <CButton
          color={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          Semua
        </CButton>
        <CButton
          color={filter === "overdue" ? "danger" : "secondary"}
          onClick={() => setFilter("overdue")}
        >
          Terlambat
        </CButton>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <CSpinner color="primary" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <p className="text-muted">📭 Tidak ada tugas</p>
      ) : (
        filteredTasks.map((task) => (
          <CCard key={task.id} className="mb-3 shadow-sm">
            <CCardBody className="d-flex justify-content-between align-items-center">
              <div>
                <h5
                  className="fw-bold"
                  style={{
                    textDecoration: task.is_done ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </h5>

                {task.description && (
                  <p className="mb-1 text-muted">{task.description}</p>
                )}

                {task.deadline && (
                  <CBadge
                    color={
                      new Date(task.deadline) < new Date() && !task.is_done
                        ? "danger"
                        : "info"
                    }
                  >
                    {new Date(task.deadline).toLocaleString()}
                  </CBadge>
                )}
              </div>

              <div className="d-flex align-items-center gap-2">
                <CFormCheck
                  checked={task.is_done}
                  onChange={(e) => toggleDone(task.id, e.target.checked)}
                />

                <CButton size="sm" color="warning" onClick={() => openEdit(task)}>
                  Edit
                </CButton>

                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Hapus
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        ))
      )}

      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CModalHeader>
          <h5>Edit Tugas</h5>
        </CModalHeader>
        <CModalBody>
          <CFormLabel>Judul</CFormLabel>
          <CFormInput
            className="mb-3"
            value={editData.title || ""}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />

          <CFormLabel>Deskripsi</CFormLabel>
          <CFormTextarea
            className="mb-3"
            rows={3}
            value={editData.description || ""}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />

          <CFormLabel>Deadline</CFormLabel>
          <CFormInput
            type="datetime-local"
            value={editData.deadline || ""}
            onChange={(e) =>
              setEditData({ ...editData, deadline: e.target.value })
            }
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModal(false)}>
            Batal
          </CButton>
          <CButton color="success" onClick={saveEdit}>
            Simpan
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Tasks;
