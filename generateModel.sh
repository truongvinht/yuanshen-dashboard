#!/bin/bash

if test $# -gt 0; then 
    # declare variable
    model=$1

    pathToFile="./models/$model.js"

    # check for model file
    if [ -f "$pathToFile" ]; then
        echo "$model.js already exists."
        exit 1
    fi

    # create model
    touch "$pathToFile"

    # fill default content in model

    # import
    echo -e "import mongoose from 'mongoose'\n" >> "$pathToFile"

    schema=$model
    schema+="Schema"

    echo -e "/* $schema will correspond to a collection in your MongoDB database. */" >> "$pathToFile"

    echo -e "const $schema = new mongoose.Schema({\n" >> "$pathToFile"

    echo -e "})\n" >> "$pathToFile"
    echo -e "export default mongoose.models.$model || mongoose.model('$model', $schema)" >> "$pathToFile"

    # create api
    apifolder=`node -p "\"$model\".toLowerCase()"`
    apifolder+="s"
    mkdir "./pages/api/$apifolder"

    apiFile="./pages/api/$apifolder/index.js"
    touch "$apiFile"

    echo -e "import apiHandler from '../../../lib/apiHandler'" >> "$apiFile"
    echo -e "import Model from '../../../models/$model'\n" >> "$apiFile"
    echo -e "export default async function handler(req, res) {" >> "$apiFile"
    echo -e "    await apiHandler(Model, req, res)\n}" >> "$apiFile"

    # create page index
    mkdir "./pages/$apifolder"
    pageFile="./pages/$apifolder/index.js"
    touch "$pageFile"

    echo -e "import dbConnect from '../../lib/dbConnect'" >> "$pageFile"
    echo -e "import $model from '../../models/$model'" >> "$pageFile"
    echo -e "import Header from '../../components/Header'\n" >> "$pageFile"
    echo -e "const $model = () => {" >> "$pageFile"
    echo -e "    return (" >> "$pageFile"
    echo -e "    <div>" >> "$pageFile"
    echo -e "        <Header headerTitle={\"$model\"}/>" >> "$pageFile"
    echo -e "    </div>" >> "$pageFile"
    echo -e "    );" >> "$pageFile"
    echo -e "};\n" >> "$pageFile"
    echo -e "export default $model\n" >> "$pageFile"



    # create page detail
else
    echo "Missing passing model name!"
fi


