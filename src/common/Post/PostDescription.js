import { useNavigate } from "react-router-dom";
import { updatePost } from "../../services/axiosService";

export default function PostDescription ({ obj, isEditing, setIsEditing, isDisable, setIsDisable, formInf, setFormInf, resetForm }) {
    const navigate = useNavigate();
  
    function onKeyPress(e) {
      if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        handleForm();
      }
      if (e.keyCode === 27) resetForm();
    }
  
    function updateInfs(e){
      setFormInf({
        ...formInf,
        [e.target.name] : e.target.value 
      });
    }
  
    function focus(e) {
      var val = e.target.value;
      e.target.value = '';
      e.target.value = val;
    }
  
    function handleForm(e) {
      setIsDisable(true);
      const split = formInf.newDescription.split("#");
      const trends = split.map(e => e.split(" ")[0]);
      trends.shift();
      const body = {...formInf, newTrends: trends}
  
      const promise = updatePost(obj.id, body);
      promise
        .then((r) => {
          setFormInf({newDescription:formInf.newDescription});
          setIsDisable(false);
          setIsEditing(false);
        })
        .catch(() => {
          alert("An error has occurred on editing post's description");
          setIsDisable(false);
        });
    }
     
    function selectHash(){
        const words = obj.description.split(' ');
        
        return <>{words.map((word, index) => {
        if(word.includes("#")){
            return <strong onClick={() => navigate("/hashtag/" + word.substring(1))} key={index}>{word} </strong>;
        } else {
            return word + " "
        }
        })}</>;
    }
    
    return (
        <>
            {
            isEditing ?
                <form onSubmit={handleForm}>
                <textarea type="text" name="newDescription" value={formInf.newDescription}
                    placeholder="Awesome article about #javascript" disabled={isDisable}
                    onChange={updateInfs} onKeyDown={onKeyPress} autoFocus
                    onFocus={focus}
                ></textarea>
                <button disabled={isDisable} type="submit" >
                </button>
                </form> :
                <p>
                {selectHash()}
                </p>
            }
        </>
    )
}