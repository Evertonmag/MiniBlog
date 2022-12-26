import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validar urlImage
    try {
      new URL(image);
    } catch (error) {
      setFormError("a imagem precisa ser uma url");
    }

    //criar lista de tags (array)
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos do formulário");
    }

    if (formError) {
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    setTitle("");
    setImage("");
    setBody("");
    setTags([]);

    //redirecionar para HomePage
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="título do post"
            required
          />
        </label>

        <label>
          <span>Url Imagem:</span>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="imagem do post"
            required
          />
        </label>

        <label>
          <span>Conteudo:</span>
          <textarea
            name="body"
            required
            value={body}
            placeholder="insira o conteudo do post"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="insira as tags separadas por virgulas"
            required
          />
        </label>

        {!response.loading && <button className="btn">Criar Post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
