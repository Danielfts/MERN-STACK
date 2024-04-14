import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../environment';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(baseUrl + "/books/" + id)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      })
  }, [id])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(baseUrl + '/books/' + id, data)
      .then(()=> {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      })

  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {
        loading ? (<Spinner/>) :('')
      }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-3 text-gray-500'>Title</label>
          <input type="text" name="" id="" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        
        <div className='my-4'>
          <label className='text-xl mr-3 text-gray-500'>Author</label>
          <input type="text" name="" id="" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        
        <div className='my-4'>
          <label className='text-xl mr-3 text-gray-500'>Publish Year</label>
          <input type="text" name="" id="" 
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook