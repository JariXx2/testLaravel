async function delOrders(id){

}

reloadData()
async function reloadData() {
    fetch('/goods/get',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Ошибка сервера");
        }
    })
    .then(data=>{
        console.log(data)
    })
    .catch(error=>{
        console.log(error.message);
    })
}