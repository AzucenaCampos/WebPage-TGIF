Vue.component('stats-table',{
    props: ["members","prop1","prop2","mostorleast"],
    methods:{
        getTenPercent(){
            /* let tenPct = Math.round(this.members.length/10)

            let sorted = this.asc ? [...this.members].sort( (a,b) => a[this.prop1] - b[this.prop1]) : [...this.members].sort( (a,b) => b[this.prop1] - a[this.prop1])

            let memberAtTenPct = sorted [tenPct][this.prop1]

            return sorted.filter (element => element[this.prop1] < memberAtTenPct) */ 

            let tenPercent = Math.round(this.members.length / 10)

            //ordenr de mayor a menor o viceversa
            let sorted = [...this.members]

                if (this.mostorleast == "least"){
                    sorted.sort((memberA,memberB) => {return memberB[this.prop1] - memberA[this.prop1]})

                let votesAttenPct = sorted [tenPercent][this.prop1];

                return sorted.filter(member => member[this.prop1] >= votesAttenPct)
                }
                else if (this.mostorleast == "most"){
                    sorted.sort((memberA,memberB) => {return memberA[this.prop1] - memberB[this.prop1]})

                let votesAttenPct = sorted [tenPercent][this.prop1];

                return sorted.filter(member => member[this.prop1] <= votesAttenPct)
                }
        }
    },
    template: `<div>
                <table class= "table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number Party Votes</th>
                            <th>Total Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for= "element in getTenPercent()">
                            <td><a :href= element.url target= blank>{{element.first_name}} {{element.middle_name || "" }} {{element.last_name}}</a></td>
                            <td>{{element[prop1]}}</td>
                            <td>{{element[prop2]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`
})


let app = new Vue ({
    el: "#app",
    data: {
        members: [],
        stats: {
            dem: [],
            rep: [],
            ind: [],
            total: [],
        }
    
    },
    methods:{
        getApi: function (){
            if(document.getElementById("senate")){
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            }else if(document.getElementById("house")){
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        },
        getPartyMembers: function (party){
            return this.members.filter(member => member.party == party)
        },
        getAverage: function(party,key){
            let sum = 0;
        
            party.forEach (function(partyMember){
                sum += partyMember[key]
            })
            return (sum / party.length || 0).toFixed(2)
        }
    },
    created: function(){
        fetch(this.getApi(),{
            method: "GET",
            headers:{
                "X-API-KEY" : "WkypxPKIePDZNSlKfU8JvzDCebWHwusKhDwmDOl3"
            }
        })
        .then(res => res.json())
        .then(json => {
            this.members = json.results[0].members
            this.stats.dem = this.getPartyMembers("D")
            this.stats.rep = this.getPartyMembers("R")
            this.stats.ind = this.getPartyMembers("ID")
            this.stats.total = this.members
        })
        .catch(error => console.log ("error al traer la info Error" + error))
    },
    
})
