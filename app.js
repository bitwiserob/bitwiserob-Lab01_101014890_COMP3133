const csv = require('csv-parser')
const fs = require('fs')
const all_results = []
const results = [[],[]]




let files = ['./canada.txt','./usa.txt']
const delete_file = (file)=>{
	fs.unlink(file, function(err){
		if(err){
			console.log(file + " file does not exist");
		}else {
			console.log(file + ' deleted');
		}
	});
}

files.forEach(delete_file);

fs.createReadStream('input_countries.csv')
	.pipe(csv())
	.on('data', (data) => {
		all_results.push(data);


		if(data.country == "Canada"){
			results[0].push(data);
		}else if(data.country == "United States"){
			results[1].push(data);
		}
	})
	.on('end', ()=>{
		console.log(results);
        process_results();
	});

let header = "country,year,population\n"

const process_results = ()=>{
for(var i=0; i<2; i++)
{
 let ws = fs.createWriteStream(files[i]);
    ws.write(header);
    for(let record of results[i]){
        ws.write(
          `${record.country},${record.year},${record.population}\n`
        )

    }
    ws.close();
}
}
