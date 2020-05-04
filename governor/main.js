var roundPos=document.getElementById("roundPos");
var ratePos=document.getElementById("ratePos");
var tbodyPos=document.getElementById("tbodyPos");
var isA=false,isB=false;
var resA,resB,rateA,rateB,formB,maxA=0;

var names1=["天箭","零战52","海盗","烈风","海毒牙","地狱猫","麦辣鸡","SB2C"];
var names2=["青花鱼","梭鱼","818中队","流星","火把","TBD(VT-8)"];
var speed1=[8.98,9.52,10.20,10.44,10.60,10.90,11.71,11.88];
var speed2=[9.98,10.31,10.97,11.37,11.64,12.04];

function calcA(){
    resA=25.06/Math.sqrt(3.14*1*(Number(a0.value)+Number(a1.value)+Number(a2.value))*(1+Number(a3.value)/100)+314);
    document.getElementById("resA").innerHTML=resA.toFixed(4)*100+"%";
    resB=25.06/Math.sqrt(3.14*1*(Number(b0.value)+Number(b1.value)+Number(b2.value))*(1+Number(b3.value)/100)+314);
    document.getElementById("resB").innerHTML=resB.toFixed(4)*100+"%";
    rateA[0]=resA*Number(cdA.value);
    document.getElementById("rateA").innerHTML=rateA[0].toFixed(2)+"s";
    var label=ratePos.getElementsByTagName("label");
    for(var i=0;i<4;i++){
        rateA[i+1]=(rateA[0]+0.3+1.5/(i+1)).toFixed(2);
        label[i].innerHTML=rateA[i+1]+"s";
    }
    isA=true;
}

function calcB(){
    if(!isA){
        return ;
    }
    for(var i=1;i<=names1.length;i++){
        for(var j=1;j<=names2.length;j++){
            rateB[i][j]=((speed1[i-1]*2+speed2[j-1]*3+9.98*3)*resB*2.2/8+0.1)*(isBeacon.checked?0.96:1);
            formB[i][j].innerHTML=rateB[i][j].toFixed(2)+"s";
        }
    }
    if(isB){
        reset();
        chose();
    }
    isB=true;
}

function calc(){
    calcA();
    calcB();
}

function chose(){
    if(maxA==0){
        alert("请选择调速上限");
        return ;
    }
    if(!isB){
        alert("请先计算时间");
        return ;
    }
    reset();
    var cnt=0;
    for(var i=1;i<=names1.length;i++){
        for(var j=1;j<=names2.length;j++){
            if(rateB[i][j]>=rateA[0] && rateB[i][j]<=rateA[maxA]){
                formB[i][j].style.backgroundColor="red";
                cnt++;
            }
        }
    }
    if(cnt==0){
        alert("无可用配装");
    }
}

function reset(){
    for(var i=1;i<=names1.length;i++){
        for(var j=1;j<=names2.length;j++){
                formB[i][j].style.backgroundColor="white";
        }
    }
}

function adjust(){
    maxA=Number(this.id.split("adjust")[1]);
    if(isB){
        reset();
        chose();
    }
}

for(var i=0;i<4;i++){
    var td=document.createElement("td");
    td.innerHTML=(i+1)+"轮炮击";
    roundPos.appendChild(td);
    var td=document.createElement("td");
    var label=document.createElement("label");
    label.id="round"+(i+1);
    label.setAttribute("for", "adjust"+i);
    var input=document.createElement("input");
    input.id="adjust"+(i+1);
    input.type="radio";
    input.name="adjust";
    input.onclick=adjust;
    td.appendChild(label);
    td.appendChild(input);
    ratePos.appendChild(td);
}

rateA=new Array();
formB=new Array();
rateB=new Array();
for(var i=0;i<=names1.length;i++){
    formB[i]=new Array();
    rateB[i]=new Array();
    var tr=document.createElement("tr");
    for(var j=0;j<=names2.length;j++){
        var td=document.createElement("td");
        if(i==0 && j==0){
            var label=document.createElement("label");
            label.innerHTML="可畏是否携带信标";
            label.setAttribute("for", "isBeacon");
            var input=document.createElement("input");
            input.id="isBeacon";
            input.type="checkbox";
            input.onclick=calcB;
            td.appendChild(label);
            td.appendChild(input);
        }
        else if(i==0){
            td.innerHTML=names2[j-1];
            var p=document.createElement("p");
            p.innerHTML=speed2[j-1]+"s";
            td.appendChild(p);
        }
        else if(j==0){
            td.innerHTML=names1[i-1];
            var p=document.createElement("p");
            p.innerHTML=speed1[i-1]+"s";
            td.appendChild(p);
        }
        else{
            formB[i][j]=td;
        }
        tr.appendChild(td);
    }
    tbodyPos.appendChild(tr);
}