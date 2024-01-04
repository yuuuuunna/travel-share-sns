import api from '.';

const API_URL = '/api/v1/alarms';

const alarmsAPI = {
  async getAllAlarms({ perPage, lastItemId }) {
    const response = await api.get(API_URL + `?perPage=${perPage}${lastItemId ? `&lastItemId=${lastItemId}` : ''}`);
    return response.data.alarms;
  },

  async setAlarmRead(alarmId) {
    return await api.patch(API_URL + `/${alarmId}`);
  },

  async deleteAlarm(alarmId) {
    return await api.delete(API_URL + `/${alarmId}`);
  },

  async deleteAllAlarm() {
    return await api.delete(API_URL + '/all');
  },
};

export default alarmsAPI;
