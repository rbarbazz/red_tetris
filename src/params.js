const params = {
  server: {
    host: 'localhost',
    port: process.env.PORT || 3004,
    get url() {
      if (process.env.NODE_ENV === 'production' && process.env.URL) {
        return (process.env.URL);
      }
      return (`http://${this.host}:${this.port}`);
    },
  },
};

export default params;
