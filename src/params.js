const params = {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3004,
    get url() {
      if (process.env.NODE_ENV === 'production') {
        return (`https://${this.host}:${this.port}`);
      }
      return (`http://${this.host}:${this.port}`);
    },
  },
};

export default params;
