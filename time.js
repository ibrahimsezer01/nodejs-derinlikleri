setTimeout(() => {
    console.log("ilk");
    setTimeout(() => {
        console.log("iki");
        setTimeout(() => {
            console.log("üç");
            setTimeout(() => {
                console.log("dört");
            }, 1000);
        }, 2000);
    }, 2000);
}, 2000);