define([
	"skylark-langx-ns",
	"./localforage"
],function(skylark,localforage){
	return skylark.attach("intg.localforage",localforage);
})