const state = {
    buckets: {
        result:[
            "object-0001",
            "object-0002",
            "object-0003",
            "object-0004",
            "object-0005",
            "object-0006",
            "object-0007",
            "object-0008",
            "object-0009",
            "object-00010",
            "object-00011",
            "object-00012",
            "object-00013",
            "object-00014",
            "object-00015",
            "object-00016",
            "object-00017",
            "object-00018",
            "object-00019",
            "object-00020",
            "object-00021",
            "object-00022",
            "object-00023",
            "object-00024",
            "object-00025",
            "object-00026",
            "object-00027",
            "object-00028",
            "object-00029",
            "object-00030",
            "object-00031",
            "object-00032"
        ]
    },
    /*当前bucket的信息*/
    isShowbucketinfo:false,
    bucketinfo:{
        bucketname:"",
        createbucketTime:"",
        bucketarea:"",
        rAwPermission:""
    }
}

const mutations = {
    SHOWBUCKETINFO(state,payload){
        state.isShowbucketinfo = true;
        state.bucketinfo.bucketname = payload;
    }
}

const actions = {
    someAsyncTask ({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    state,
    mutations,
    actions
}
