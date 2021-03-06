import React,{useState} from 'react'
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search"
import Pagination from './Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';


// const Giphy_api="https://api.giphy.com/v1/gifs/search?&q=${input}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=10&offset=0"

 function Header() {

    const [input,setInput]= useState("");
    const [gifs,setGifs]=useState([])
    const [loading,setLoading]=useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

   const searchGif=(e)=>{
    //    console.log(e.target.value)
    e.preventDefault()
       if(searchGif.length>0){
           setLoading(true)
           fetch(`https://api.giphy.com/v1/gifs/search?&q=${input}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=60&offset=0`)
           .then((res)=>{
            setLoading(false)
            // console.log(input)
               return res.json()
           })
           .then((result)=>{
               setGifs(result.data.map((gif)=>{
                   return gif.images.fixed_height.url
               }))
           })
           .catch((e)=>{
            setLoading(false)
               alert("something went wrong")
           })
       }


   }

//     // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = gifs.slice(indexOfFirstPost, indexOfLastPost);
//   console.log(currentPosts)

//   // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
      <>
    <div className='header'>
        <form onSubmit={searchGif} className='header'>
        <div className='inputBox'>       
           <SearchIcon/>       
        <input type="text" placeholder='Article name or keywords' value={input} onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <button onClick={searchGif}>Search
        </button>  
        </form>     
    </div>
    <div className='showResults'>
        {
            (loading)?(
        
        <div className="loading">
            <div className="loader">                
            </div>
        </div>
            ) :(
        <div className="list">
            {
                currentPosts.map((gif,index)=>{
                    // console.log(gif)
                    return(
                        
                        <div className="item">                            
                            <img src={gif} key={index}/>                     
                     </div>   
                    )
                })
                
            }
        </div>
        
            )
        }
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={gifs.length}
        paginate={paginate}                            
    />

    </div>
    
   
    </>
  )
}
export default Header
