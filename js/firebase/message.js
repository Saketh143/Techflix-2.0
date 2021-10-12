function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}



const subscribe = () => {
    // let timestamp = Date.now();
    // console.log(timestamp);
    let email = document.getElementById("newsletter_email").value;



    if (validateEmail(email)) {
        firebase
            .database()
            .ref()
            .child("subscribe")
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let participantsList = snapshot.val();
                    participantsList.push(email);
                    setData(participantsList);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    else {
        Swal.fire({
            title: "Check Input Fields",
            text: "Some of the input field(s) are incorrectly typed!",
            icon: "question",
            confirmButtonText: "Enter Again",
            allowOutsideClick: false,
        });
    }
}

function setData(participantsList) {
    firebase
        .database()
        .ref(`subscribe`)
        .set(participantsList);
    Swal.fire({
        title: "Subscribed",
        text: "Subscription of Technflix Newsletter Added Successfully!!!",
        icon: "success",
    }).then(function () {
        document.getElementById("newsletter_email").value = "";
    });
    return;
}





const submitMessage = () => {

    let timestamp = Date.now();
    // console.log(timestamp);
    let msg = document.getElementById("message").value;
    let name = document.getElementById("your_name").value;
    let email = document.getElementById("your_email").value;

    if (validateEmail(email) && name != "" && msg != "") {
        firebase.database().ref(`/Messages/${timestamp}`).set({
            Name: name,
            Email: email,
            Message: msg
        });
        Swal.fire({
            title: "Message Sent",
            text: "Message Delivered to ECEA Successfully!",
            icon: "success",
        }).then(function () {
            document.getElementById("message").value = "";
            document.getElementById("your_name").value = "";
            document.getElementById("your_email").value = "";
        });

    }
    else {
        Swal.fire({
            title: "Check Input Fields",
            text: "Some of the input field(s) are incorrectly typed!",
            icon: "question",
            confirmButtonText: "Enter Again",
            allowOutsideClick: false,
        });
    }
}

