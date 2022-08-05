package response

type JSONResponse struct {
    Success  bool     `json:"success"`
    Messages string `json:"messages"`
    Data interface{}  `json:"data"` 
}
