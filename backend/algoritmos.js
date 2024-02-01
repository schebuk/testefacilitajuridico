function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.coordenada_x - point1.coordenada_x, 2) + Math.pow(point2.coordenada_y - point1.coordenada_y, 2));
  }
  
  function bruteForceTSP(clientes) {
    const n = clientes.length;
    let menorDistancia = Infinity;
    let melhorRota = [];
  
    function permutate(array, callback) {
      function p(array, index) {
        if (index == array.length - 1) {
          callback(array);
          return 1;
        }
  
        for (let i = index; i < array.length; i++) {
          [array[index], array[i]] = [array[i], array[index]];
          p([...array], index + 1);
          [array[index], array[i]] = [array[i], array[index]];
        }
      }
  
      p(array, 0);
    }
  
    permutate(clientes, (permutacao) => {
      let distanciaTotal = 0;
      for (let i = 0; i < permutacao.length - 1; i++) {
        distanciaTotal += calculateDistance(permutacao[i], permutacao[i + 1]);
      }
      distanciaTotal += calculateDistance(permutacao[permutacao.length - 1], permutacao[0]);
  
      if (distanciaTotal < menorDistancia) {
        menorDistancia = distanciaTotal;
        melhorRota = permutacao.map((cliente) => cliente.id);
      }
    });
  
    return melhorRota;
  }
  
  module.exports = {
    bruteForceTSP,
  };