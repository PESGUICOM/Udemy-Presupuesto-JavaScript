class Egreso extends Dato{
    static contadorEgreso = 0;

    constructor (descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.contadorEgreso;
    }
    get id (){
        return this._id;
    }
}