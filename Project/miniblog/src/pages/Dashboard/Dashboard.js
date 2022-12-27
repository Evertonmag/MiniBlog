import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useState } from "react";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postId, setPostId] = useState(null);

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/post/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>

          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  {/* <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button> */}
                  <button
                    onClick={() => {
                      setIsModalVisible(true);
                      setPostId(post.id);
                    }}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}

          {isModalVisible ? (
            <Modal onClose={() => setIsModalVisible(false)}>
              <h2>Deseja realmente excluir?</h2>
              <p>
                Ao clicar sim o item será removido permanetemente, tem certeza
                disso?
              </p>
              <div className="modal-footer">
                <button
                  className="btn btn-outline btn-dark"
                  onClick={() => setIsModalVisible(false)}
                >
                  cancelar
                </button>
                <button
                  className="btn btn-outline btn-danger"
                  onClick={() => {
                    deleteDocument(postId);
                    setIsModalVisible(false);
                  }}
                >
                  Sim, quero remover!
                </button>
              </div>
            </Modal>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Dashboard;
