class User {
    constructor(email, password){
        this.email = email;
        this.password = password
    }

    get email(){
        return this._email.toUpperCase()
    }
    set email(value){
        this._email = value
    }

    get password(){
        return `${this._password}rishit`
    }

    set password(value){
        this._password = value
    }
}

const rishit = new User("r@ishit.ai", "abc")
console.log(rishit.password);