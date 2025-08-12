from services.log import LogService


def read_logs():
    log_service = LogService()
    return log_service.read()
