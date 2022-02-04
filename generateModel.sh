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
    pageName=$model
    pageName+="Page"

    echo -e "import dbConnect from '../../lib/dbConnect'" >> "$pageFile"
    echo -e "import $model from '../../models/$model'" >> "$pageFile"
    echo -e "import Header from '../../components/Header'\n" >> "$pageFile"
    echo -e "const $pageName = () => {" >> "$pageFile"
    echo -e "    return (" >> "$pageFile"
    echo -e "    <div>" >> "$pageFile"
    echo -e "        <Header headerTitle={\"$model\"}/>" >> "$pageFile"
    echo -e "    </div>" >> "$pageFile"
    echo -e "    );" >> "$pageFile"
    echo -e "};\n" >> "$pageFile"
    echo -e "export default $pageName\n" >> "$pageFile"

    # create page detail
    mkdir "./pages/$apifolder/[id]"
    detailFile="./pages/$apifolder/[id]/index.js"
    touch "$detailFile"
    editPageName="Edit"
    editPageName+=$pageName

    apiPath="/api/$apifolder/\${id}"

    echo -e "import { useRouter } from 'next/router'" >> "$detailFile"
    echo -e "import useSWR from 'swr'" >> "$detailFile"
    echo -e "import Header from '../../../components/Header'\n" >> "$detailFile"
    echo -e "const fetcher = (url) =>" >> "$detailFile"
    echo -e "  fetch(url)" >> "$detailFile"
    echo -e "    .then((res) => res.json())" >> "$detailFile"
    echo -e "    .then((json) => json.data)\n" >> "$detailFile"
    
    echo -e "const $editPageName = () => {" >> "$detailFile"
    echo -e "    const router = useRouter()" >> "$detailFile"
    echo -e "    const { id } = router.query" >> "$detailFile"
    echo -e "    const { data: object, error } = useSWR(id ? \`$apiPath\` : null, fetcher)\n" >> "$detailFile"
    echo -e "    if (error) return <p>Failed to load</p>" >> "$detailFile"
    echo -e "    if (!object) return <p>Loading...</p>\n" >> "$detailFile"
    echo -e "    return (" >> "$detailFile"
    echo -e "    <div>" >> "$detailFile"
    echo -e "        <Header headerTitle={\"$model\"}/>" >> "$detailFile"
    echo -e "    </div>" >> "$detailFile"
    echo -e "    );" >> "$detailFile"
    echo -e "};\n" >> "$detailFile"

    echo -e "export async function getServerSideProps() {" >> "$detailFile"
    echo -e "    // start db connection\n    await dbConnect()" >> "$detailFile"
    echo -e "    /* find all the data in our database */" >> "$detailFile"
    echo -e "    const result = await $model.find({}).catch(err => {" >> "$detailFile"
    echo -e "    return []})" >> "$detailFile"
    echo -e "    return { props: { }  }" >> "$detailFile"
    echo -e "}\n" >> "$detailFile"

    echo -e "export default $editPageName\n" >> "$detailFile"
else
    echo "Missing passing model name!"
fi


