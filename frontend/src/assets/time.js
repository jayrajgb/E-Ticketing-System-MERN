const time = new Date()
time.setHours(6,0,0,0)
console.log(time.getHours());

<input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />