interface Alert {
    isSuccess: boolean;
    p: string;
}

class Alert implements Alert {
    constructor(p, isSuccess){
        this.p = p;
        this.isSuccess = isSuccess;
    }

    create(){
        const alert = document.createElement('div');
        const pTag = document.createElement('p');
        const iTag = document.createElement('i');
        iTag.classList.add('fa', this.isSuccess ? 'fa-check' : 'fa-times');
        pTag.textContent = this.p;

        alert.appendChild(pTag);
        alert.appendChild(iTag);
        alert.classList.add('alert', this.isSuccess ? 'success' : 'error', 'flex-row-reverse', 'hidden');
        
        return alert;
    }
}

export default Alert;