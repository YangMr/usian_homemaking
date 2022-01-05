Component({
    properties: {
        rating : {
            type : Object
        }
    },
    data: {},
    methods: {
        handlePreview(event){
            const index = event.currentTarget.dataset.index;
            console.log(index)
            wx.previewImage({
                current : this.data.rating.illustration[index],
                urls : this.data.rating.illustration
            })
        }
    }
});
