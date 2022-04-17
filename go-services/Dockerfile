FROM golang:1.17

# Dosyalarimizi container icindeki app directorysinde tutacagiz
WORKDIR /app

# Modullerimizi container icine kopyalayip modullerimizi indiriyoruz
COPY go.mod go.sum ./
RUN go mod download
# Dosyalarimizin hepsini kopyaliyoruz
COPY . .

# Multistage build yaparak optimizasyonu sagliyoruz

# Projemizi build edip calistiriyoruz
RUN go build -o main cmd/main/main.go

CMD ./main