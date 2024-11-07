import TodoContainer from "@/components/TodoContainer";
import Image from "next/image";

export default function Home() {
  const containerInfos = [
    {
      id: 1,
      hasIcon: true,
      iconColor: "red",
      todoName: "Incomplete",
      todosCount: 0
    },
    {
      id: 2,
      hasIcon: true,
      iconColor: "skyblue",
      todoName: "To Do",
      todosCount: 0
    },
    {
      id: 3,
      hasIcon: true,
      iconColor: "yellow",
      todoName: "Doing",
      todosCount: 0
    },
    {
      id: 4,
      hasIcon: false,
      todoName: "Under Review",
      todosCount: 0
    },
    {
      id: 5,
      hasIcon: false,
      todoName: "Completed",
      todosCount: 0
    },
    {
      id: 6,
      hasIcon: false,
      todoName: "Over Date",
      todosCount: 0
    }
  ]
  return (
    <div className="flex gap-5 overflow-x-scroll">
      {containerInfos.map((info, idx)=>{
        return <TodoContainer index={idx} hasIcon={info.hasIcon} iconColor={info.iconColor} todoName={info.todoName} todosCount={info.todosCount} key={idx}/>
      })}
    </div>
  );
}
