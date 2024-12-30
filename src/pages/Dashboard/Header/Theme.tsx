import { Palette } from '@mui/icons-material';
import { Button, Col, Flex, Modal, Row, Select, Switch } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setPrimaryColor, toggleTheme } from '../../../store/themeSlice';
import { primaryColors } from '../../../theme';
import { useTranslation } from 'react-i18next';

const Theme = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { theme, isDarkMode, colorPrimary } = useSelector((state: RootState) => state.theme);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getColorComponent = primaryColors.find((component) => component.color === colorPrimary);

    return (
        <>
            <Button type='text' onClick={() => setIsModalOpen(true)}>
                <Palette sx={{ fontSize: 16, color: theme.palette.text.primary }} />
            </Button>

            <Modal
                title={t("themeModal.themeSettings")}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Flex vertical gap={12}>
                    <Row justify={"space-between"}>
                        <Col>{t("themeModal.darkMode")}:</Col>
                        <Col><Switch onChange={() => dispatch(toggleTheme())} value={isDarkMode} /></Col>
                    </Row>

                    <Row justify={"space-between"}>
                        <Col>{t("themeModal.colorTheme")}: </Col>
                        <Col>
                            <Select
                                value={getColorComponent?.name}
                                style={{ width: 120 }}
                                options={primaryColors.map((color) => ({
                                    value: color.color,
                                    label: color.name,
                                }))}
                                onChange={(e) => dispatch(setPrimaryColor(e))}
                            />
                        </Col>
                    </Row>
                </Flex>
            </Modal>
        </>
    )
}

export default Theme;