import AddNote from './AddNote';
import Alert from './Alert';
import Navebar from './Navebar';
import Notes from './Notes';


const Home = () => {
 
  return (
    <div>
       <Navebar />
          <Alert message ="very good man"/>
          <div className="container justify-content-center">
      
<Notes/>
</div>
    
    </div>
  )
}

export default Home

