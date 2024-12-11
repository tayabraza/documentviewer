import { FileData } from '../types';

function DocumentViewer(props: { data: FileData[], filter: string }) {
    const { data, filter } = props;

    const showFolder = (event: any) => {
        event.target.classList.contains('folder') ? event.target.nextElementSibling.classList.toggle('hidden') : event.target.lastElementChild.classList.toggle('hidden') ;
    }

    const renderFile = (file: FileData) => {
        return (
            <div key={file.name} className="file-item bg-white shadow-sm p-3 rounded-md flex justify-between items-center mb-2 mt-4">
                <p className='text-sm font-bold text-gray-800 file'>{file.name}.{file.type}</p>
                <p className="text-sm text-gray-500 file">Date Added: {file.added}</p>
            </div>
        );
    }

    const renderFolder = (folder: FileData) => {
        return (
            <div key={folder.name} className="folder-item bg-blue-50 shadow-sm p-3 rounded-md mb-2 cursor-pointer" onClick={ showFolder }>
                <p className='text-sm font-bold text-blue-700 folder'>{folder.name} (Folder)</p>

                {folder.files && (
                    <div className="pl-4 mt-2 hidden pointer-events-none">
                        {folder.files.map((file) => (file.type === 'folder' ? renderFolder(file) : renderFile(file)))}
                    </div>
                )}

            </div>
        );
    }

    const filteredData = data.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            {filteredData.map((item) => (item.type === 'folder' ? renderFolder(item) : renderFile(item)))}
        </div>
    );
}

export default DocumentViewer;