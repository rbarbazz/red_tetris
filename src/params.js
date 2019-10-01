const params = {
  server: {
    host: 'localhost',
    port: process.env.PORT || 3004,
    get url() {
      if (process.env.NODE_ENV === 'production') {
        return ('https://redtetris-42.herokuapp.com/');
      }
      return (`http://${this.host}:${this.port}`);
    },
  },
};

export default params;
