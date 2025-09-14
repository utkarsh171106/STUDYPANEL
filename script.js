const tabButtons=document.querySelectorAll('.tab-button');
const tabContents=document.querySelectorAll('.tab-content');
tabButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        tabButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const tab=btn.getAttribute('data-tab');
        tabContents.forEach(c=>c.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});
function todo(){
    const title=document.getElementById('todo-title').value.trim();
    const task=document.getElementById('todo-task').value.trim();
    if(!title||!task)return alert('Please fill both fields');
    const now=new Date().toLocaleString();
    const list=document.getElementById('todo-list');
    const item=document.createElement('div');
    item.classList.add('item');
    item.innerHTML=`
        <div style="display:flex; align-items:center; gap:15px;">
            <input type="checkbox">
            <div><strong>${title}</strong>:${task}<br><small>${now}</small></div>
        </div>
        <button class="delete" onclick="this.parentElement.remove()">Delete</button>
    `;
    list.prepend(item);
    document.getElementById('todo-title').value='';
    document.getElementById('todo-task').value='';
}
let timerInterval;
function timer(){
    clearInterval(timerInterval);
    const sessionMins=parseInt(document.getElementById('session-length').value);
    const breakMins=parseInt(document.getElementById('break-length').value);
    if (isNaN(sessionMins)||isNaN(breakMins)||sessionMins<=0||breakMins<=0){
        return alert('Please enter valid session and break times');
    }
    let totalSeconds=sessionMins*60;
    const display=document.getElementById('timer-display');
    const reminder=document.getElementById('reminder');
    reminder.textContent='';
    timerInterval=setInterval(()=>{
        const mins=Math.floor(totalSeconds/60);
        const secs=totalSeconds%60;
        display.textContent=`${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        if(totalSeconds<=0){
            clearInterval(timerInterval);
            reminder.textContent=`✅ Session complete! Take a break for ${breakMins} min(s).`;
            alert('Time to take a break!');
        }
        totalSeconds--;
    },1000);
}
let editingNote=null;
function note(){
    const text=document.getElementById('note-text').value.trim();
    if(!text)return alert('Note cannot be empty');
    const now=new Date().toLocaleString();
    const list=document.getElementById('notes-list');
    if(editingNote){
        editingNote.querySelector('.note-text').innerHTML=`${text}<br><small>${now}</small>`;
        editingNote=null;
    }else{
        const noteItem=document.createElement('div');
        noteItem.classList.add('item');
        noteItem.innerHTML=`
            <div class="note-text">${text}<br><small>${now}</small></div>
            <div>
                <button class="delete" onclick="this.parentElement.parentElement.remove()">Delete</button>
                <button class="edit" onclick="editNote(this)">Edit</button>
            </div>
        `;
        list.prepend(noteItem);
    }
    document.getElementById('note-text').value='';
}
function editNote(btn){
    const item=btn.closest('.item');
    const textContent=item.querySelector('.note-text').innerText;
    document.getElementById('note-text').value=textContent.split('\n')[0];
    editingNote=item;
}