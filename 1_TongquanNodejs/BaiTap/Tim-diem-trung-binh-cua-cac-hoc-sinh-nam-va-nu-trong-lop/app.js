let students=[
    {
        name: "Ha",
        gender: 'female',
        poin: 8
    },
    {
        name: "Huy",
        gender: 'male',
        poin: 9
    },
    {
        name: "Hung",
        gender: 'male',
        poin: 7
    },
    {
        name: "Phuong",
        gender: 'female',
        poin: 6
    },
    {
        name: "Huyen",
        gender: 'female',
        poin: 10
    },
    {
        name: "Long",
        gender: 'male',
        poin: 5
    },
    {
        name: "Luan",
        gender: 'male',
        poin: 10
    },
    {
        name: "Linh",
        gender: 'female',
        poin: 8
    }

];
let countGirl=0;
let countBoy=0;
let sumPointGirl=0
let sumPointBoy=0

students.forEach((value,index)=>{
    if(value.gender==='female'){
        countGirl++;
        sumPointGirl+=value.poin
    }
      if(value.gender==='male'){
        countBoy++;
        sumPointBoy+=value.poin
    }
})
let averageGirl=sumPointGirl/countGirl;
let averageBoy=sumPointBoy/countBoy;

console.log("averageGirl= "+averageGirl)
console.log("averageBoy= "+averageBoy)