Hooks.on('renderWallConfig', (app, html, data) => {
    
    if (data.object.window === 0) {
        app.setPosition({
            height: 270,
            width: 400,
        });
        return;
    }

    app.setPosition({
        height: 500,
        width: 400,
    });

    const message = 
        `<div class="form-group">
            <label>Is Window?</label>
            <select name="window" data-dtype="Number">
                <option value="1" selected>None</option>
                <option value="0"></option>
            </select>
        </div>`

    console.log(html.find('.form-group'));

}
