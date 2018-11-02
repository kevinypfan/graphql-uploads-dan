import XLSX from 'xlsx'

export const xlsxFileParse = (file) => {
    const workfile = XLSX.read(file)
    const sheetNames = workfile.SheetNames
    const worksheet = workfile.Sheets[sheetNames[0]];

    const json_xlsx = XLSX.utils.sheet_to_json(worksheet)
    return json_xlsx
}

export const readXlsxParse = (path) => {
    const workfile = XLSX.readFile(path)
    const sheetNames = workfile.SheetNames
    const worksheet = workfile.Sheets[sheetNames[0]];

    const json_xlsx = XLSX.utils.sheet_to_json(worksheet)
    return json_xlsx
}

