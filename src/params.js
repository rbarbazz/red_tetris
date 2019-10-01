const params = {
  server: {
    host: 'localhost',
    port: process.env.PORT || 3004,
    get url() {
      if (process.env.NODE_ENV === 'production' && process.env.URL !== undefined) {
        console.log("prod: ", process.env.URL);
        return (process.env.URL);
      }
      console.log("dev: ", process.env.URL);
      return (`http://${this.host}:${this.port}`);
    },
  },
};

export default params;
