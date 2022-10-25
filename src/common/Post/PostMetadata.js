export default function PostMetadata ({ obj }) {
    return (
        <a href={obj.link} target="_blank" rel="noopener noreferrer">
          <div className="post">
            <div className="text">
              <h3>{obj.linkTitle}</h3>
              <h4>
              {obj.linkDescription}
              </h4>
              <p>{obj.link}</p>
            </div>
            <img
              src={obj.linkImage}
              alt="Link"
            />
          </div>
        </a>
    )
}