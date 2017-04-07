app.factory('batExecutorService', function () {
    return {
        //http://ourcodeworld.com/articles/read/156/how-to-execute-a-bat-file-receive-data-and-errors-with-electron-framework

        executeBat: function (batchFileName, successHandler, failureHandler, params) {
            "use strict";
            // The path to the .bat file

            var paramsString = " ";
            if(params){
                for(var i=0;i<params.length;i++){
                    paramsString+=params[i]+" ";
                } 
            }
            var myBatFilePath = "%cd%\\bat\\" + batchFileName + paramsString;

            const spawn = require('child_process').spawn;
            const bat = spawn('cmd.exe', ['/c', myBatFilePath]);


            // Handle normal output
            bat.stdout.on('data', (data) => {
                var str = String.fromCharCode.apply(null, data);
                console.info(str);
                successHandler(data);
            });

            // Handle error output
            bat.stderr.on('data', (data) => {
                var str = String.fromCharCode.apply(null, data);
                console.error(str);
                failureHandler(data);
            });

            // Handle on exit event
            bat.on('exit', (code) => {
                var preText = `Child exited with code ${code} : `;

                switch (code) {
                    case 0:
                        console.info(preText + "Batch has been closed correctly.")
                        break;
                    default:
                        console.info(preText + "Batch has NOT been closed correctly.")
                        break;
                }
            });
        }
    };
});