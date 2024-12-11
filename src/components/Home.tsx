import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import DocumentViewer from './DocumentViewer';
import { FileData } from '../types';

function Home(){

    const [data, setData] = useState<FileData[]>([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect( () => {

        async function fetchData() {
            try {
                const response = await fetch('../src/database/db.json');
                const result: FileData[] = await response.json();
                setData(result);
            }
            catch (error) {
                console.error('Error fetching data: ' + error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();

    }, []);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p><i className="fa fa-spinner fa-spin" style={{fontSize: '72px'}}></i></p>
                <p className='text-xl'>Loading...</p>
            </div>
        )
    }

    return (

        <>

        <Header />

        <main>
            <div className='bg-gray-50 p-10 rounded'>
                <form className='text-center mb-10'>
                    <input type="text" placeholder="Filter by name" value={filter} onChange={(e) => setFilter(e.target.value)}  className="mt-2 p-2 w-full max-w-lg border rounded-md text-gray-700 text-center" />
                </form>
                <div>
                    <DocumentViewer data={data} filter={filter} />
                </div>
            </div>
        </main>

        <Footer />

        </>

    )
}

export default Home