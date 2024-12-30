
const Comments = ({ comments }) => {

  return (
    <div className="mt-4">
      {comments.length === 0 ? (
        <p>No comments available</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mt-2">{comment.comment}</div>
        ))
      )}
    </div>
  );
};

export default Comments;
