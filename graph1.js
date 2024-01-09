document.getElementById('csvFileInput').addEventListener('change', function(event){
    const file = event.target.files[0];
    Papa.parse(file, {
        header: true,
        complete: function(results) {
            const data = results.data;
            const marquePrixMap = {};

            data.forEach(row => {
                if (!marquePrixMap[row.Marque]) {
                    marquePrixMap[row.Marque] = [];
                }
                marquePrixMap[row.Marque].push(parseFloat(row.Prix));
            });
            const moyennePrixParMarque = {};
            for (let marque in marquePrixMap) {
                const total = marquePrixMap[marque].reduce((acc, prix) => acc + prix, 0);
                const moyenne = total / marquePrixMap[marque].length;
                moyennePrixParMarque[marque] = moyenne;
            }

            console.log(moyennePrixParMarque);
        }
    });
});
