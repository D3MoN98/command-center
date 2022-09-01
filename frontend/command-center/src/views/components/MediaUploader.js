import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import { useDispatch, useSelector } from "react-redux";
import { mediaActionCreator } from "../../store/media";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function MediaUploader() {
  let [showModal, setShowModal] = useState(false);
  let [previewImg, setPreviewImg] = useState(null);
  let [loadMore, setLoadMore] = useState(null);
  const [files, setFiles] = useState([]);
  let dispatch = useDispatch();
  let medias = useSelector((state) => state.media.medias);

  const server = {
    process: (
      fieldName,
      file,
      metadata,
      load,
      error,
      progress,
      abort,
      transfer,
      options
    ) => {
      const data = new FormData();
      data.append(fieldName, file, file.name);

      dispatch(mediaActionCreator.createMediaAction(data))
        .then((response) => {
          load(response);
        })
        .catch((error) => {
          abort();
        });
      return {
        abort: () => {
          abort();
        },
      };
    },
  };

  useEffect(() => {
    if (showModal) {
      console.log("ds");
      fetchMediaHandler(loadMore);
    }
  }, [showModal]);

  const fetchMediaHandler = (page = 1, refresh = false) => {
    dispatch(mediaActionCreator.fetchMediaByUserAction({ page }, refresh))
      .then((response) => {
        if (
          response.meta &&
          response.meta.current_page < response.meta.last_page
        ) {
          setLoadMore(response.meta.current_page + 1);
        } else if (
          response.meta &&
          response.meta.current_page == response.meta.last_page
        ) {
          setLoadMore(null);
        }
      })
      .catch((error) => {});
  };

  const loadMoreHandler = () => {
    fetchMediaHandler(loadMore);
  };

  return (
    <>
      <div className="media-file-upload">
        <div className="preview">
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Upload
          </Button>
          {/* <img src="https://via.placeholder.com/512x512" width={128} alt="" /> */}
        </div>
      </div>
      <Modal
        size="xl"
        centered
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Media Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                server={server}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </div>
          </div>
          <div className="row mt-3 media-library">
            <div className="col-8 library-list-otr">
              <h5>Media Library</h5>
              <div className="media-filter">
                <Form.Select size="sm">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>

                <Form.Control type="text" size="sm" placeholder="Search" />
              </div>
              <div className="library-list">
                {medias.map((media) => {
                  return (
                    <img
                      key={media.id}
                      onClick={() => setPreviewImg(media)}
                      data-name={media.name}
                      src={media.url}
                      width={64}
                      alt={media.alt}
                      className={
                        previewImg && previewImg.id == media.id
                          ? "active"
                          : null
                      }
                    />
                  );
                })}
              </div>
              <div className="media-pagination text-center mt-2">
                {loadMore ? (
                  <Button size="sm" onClick={loadMoreHandler} variant="primary">
                    Load More
                  </Button>
                ) : null}
              </div>
            </div>
            {previewImg ? (
              <div className="col-4">
                <h5>Preview</h5>

                <img src={previewImg.url} width={256} alt="" />
                <Form.Group
                  className="form-group mt-2"
                  controlId="form-group-id"
                >
                  <Form.Control
                    size="sm"
                    type="text"
                    defaultValue={previewImg.name}
                    placeholder="Name"
                  />
                </Form.Group>
                <Form.Group
                  className="form-group mt-2"
                  controlId="form-group-id"
                >
                  <Form.Control
                    size="sm"
                    type="text"
                    defaultValue={previewImg.url}
                    placeholder="url"
                  />
                </Form.Group>
              </div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
