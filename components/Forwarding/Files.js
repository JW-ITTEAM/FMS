import {useDropzone} from 'react-dropzone'
import { Badge, Col, Row, Button } from "reactstrap"
import fetch from 'node-fetch'
import axios, { post } from 'axios'

export const Files = ({FilePath, FILE}) => {
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        fontFamily: 'Roboto',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
      };
      
      const activeStyle = {
        borderColor: '#2196f3'
      };
      
      const acceptStyle = {
        borderColor: '#00e676'
      };
      
      const rejectStyle = {
        borderColor: '#ff1744'
      };
    const onDrop = React.useCallback(async acceptedFiles => {
        console.log(acceptedFiles)
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            path: FilePath
          }
        }
        console.log("UPLOAD START")
        const upload = new Promise((res, rej)=>res(post(`${process.env.BASE_URL}api/file/upload`, formData, config)))
        upload.then(ga=> console.log(ga)) 

        // const Fetch = await fetch(`http://localhost:3000/api/files/NEW_PATH`).then(t=>t.json())
        // console.log(Fetch)
      }, [])

      const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
      } = useDropzone({onDrop});

      const files = acceptedFiles.map(file => <a href={URL.createObjectURL(file)} key={file.path} target="__blank"><Badge className="mr-2" color="primary"><i className="fa fa-file"></i>{file.path}</Badge></a>);

      const style = React.useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
      
    return(
        <>
        <hr />
        <Row className="mb-4">
          <Col sm="3">
            <span className="text-info">
              <span className="fa-stack">
                <i className="fa fa-circle fa-stack-2x text-info"></i>
                <i className="fa fa-cloud fa-stack-1x fa-inverse"></i>
              </span>
              DOCS
            </span>
          </Col>
          <Col sm="9" className="pt-1">
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>UPLOAD FILES</p>
              </div>
              <aside className="mt-3">
                <ul>{files}</ul>
              </aside>
          </Col>
        </Row>
        <Row>
            {FILE && FILE.map(ga=>(
              <Button key={ga.basename} size="sm" target="__empty" href={`${process.env.DOWNLOADABLE}${ga.filename}`} className="mr-2 mb-1" color="primary" outline><i className="fa fa-file mr-2"></i>{ga.basename}</Button>
          ))}
        </Row>
      </>
)}
export default Files;