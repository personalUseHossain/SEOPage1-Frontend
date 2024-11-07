import React from 'react'
import '@/public/styles/TodoContainer.css'
import TodoCard from './TodoCard'

async function getUploadeFileCount() {
  const request = await fetch(
    `https://seopage1.glitch.me/file-counts`
  );
  const response = await request.json();
  console.log(response)
  return response
}

export default async function TodoContainer({index, todoName, todosCount, hasIcon, iconColor}) {
  const uploadedFilesCount = await getUploadeFileCount()

  return (
    <div className='bg-[whitesmoke] p-3'>
      <div className='flex justify-between rounded-lg mb-10'>
        <div className='flex gap-2'>
        {hasIcon && (
          <TodoContainerIcon iconColor={iconColor} />
        )}
        <p className='font-bold'>{todoName}</p>
        </div>
        <p className='font-bold shadow-lg'>{todosCount}</p>
      </div>
      <div className='grid gap-3 overflow-y-scroll' style={{height: '80vh'}}>
        {Array.from({length: 15}).map((_, idx)=>{
          return <TodoCard key={idx} columnIndex={idx} rowIndex={index} attachmentCount={uploadedFilesCount.filter((obj)=> obj.folder == `${index}_${idx}`)[0]?.fileCount || 0}/>
        })}
      </div>
    </div>
  )
}


function TodoContainerIcon({iconColor}){
  return(
    <div className='todoContainerIcon' style={{background: iconColor}}></div>
  )
}