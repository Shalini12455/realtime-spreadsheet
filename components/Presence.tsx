export default function Presence({users}:{users:any[]}){

return(

<div className="flex gap-2">

{users.map((u)=>(
<div
key={u.id}
className="w-6 h-6 rounded-full bg-blue-400"
/>
))}

</div>

);
}