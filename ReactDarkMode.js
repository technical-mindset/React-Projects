        
        import React, {  useState} from 'react'
        export default function DarkMode() {
            const [state, setstate] = useState("Dark Mode--Off");
            let my_Style = {
                color: "black",
                backgroundColor: "white" 
            }
            const [varcolor, setcolor] = useState(my_Style);
            return (
                <div className="container" style={varcolor}>
                    <button  type="button" className="btn btn-primary" onClick={()=>{
                        if(state == "Dark Mode--On"){
                            setstate("Dark Mode--Off");
                            setcolor({color:'black',backgroundColor:'white'});
                        }
                        else {
                            setstate("Dark Mode--On");
                            setcolor({color:'white',backgroundColor:'black'});
                        }
                    }}>
                        {state}
                        </button>
                </div>
            )
        }

