

module.exports={
    name:'ready',
    once:true,
    execute(client){
       console.log(`Logged in as ${client.user.tag}`);
    }

    // client.user.setPresence({
    //     activities:[{ name: "🎵 Lofi Music", type: 0 }], 
    //     status: "online",
    // });
    
}