<template>
    <div class = "page">
        <h2 class = "title is-2">Feed Page</h2>

        <table class="table">
            <thead>
                <tr>
                <th>id</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Password</th>
                <th>DOB</th>
                <th>Type</th></tr>
            </thead>
            <tbody>
                <tr v-for="(x, i) in list"
                :key="i"
                :i="i"
                :post="x">
                <th>{{x.id}}</th>
                <td>{{x.FirstName}}</td>
                <td>{{x.LastName}}</td>
                <td>{{x.Password}}</td>
                <td>{{x.DOB}}</td>
                <td>{{x.User_Type}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {getList} from "@/models/users";
import session from "@/models/session";

export default {
    data(){
        return{
            list: []
        }
    },
    async created(){
        this.list = await getList();
    },
    components:{

    },
    methods: {

    }
}
</script>

<style>
    .card{
        margin-bottom: 30px;
    }
</style>