import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
    const [question, setQuestion] = useState({ 
        description:"",
        alternatives:[{
            "text":"",
            "isCorrect":""
        }]
    });
    return(
        <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Question</h2>
        <form >
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              
              
            />
          </div>
</form>
</div></div>        
    )
    }
export default AddQuestion;