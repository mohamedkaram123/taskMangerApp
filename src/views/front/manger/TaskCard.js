
export default function TaskCard({item}){

  let { title, desc, status } = item


    const getStatus = () => {
      switch (status) {
        case 'in_progress':
          return {
            color:'bg-yellow-200 text-yellow-800',
            name:'in progress'
          } ;
        case 'done':
          return {
            color:'bg-indigo-600 text-white',
            name:'done'
          } ;
        case 'pending':
        default:
          return {
            color:'bg-gray-200 text-gray-800',
            name:'pending'
          } ;
      }
    };



  
    return (
      <div  className="border rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">{title}</h2>
           <p  
             className="text-gray-700 mb-4 cursor-pointer">{desc}</p>
            

            <div className={`inline-block rounded-full px-3 py-1 ${getStatus().color}`}>
                <span title="please enter double click for update" 
                className="text-sm font-medium  cursor-pointer">
                  {getStatus().name}
                </span>
            </div>
        
        </div>
    );
  }